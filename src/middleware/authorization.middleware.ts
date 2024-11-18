import { Request, Response, NextFunction } from 'express';
import User from '../entities/user.entity'; // Import your User entity
import AppDataSource from '../config/database.config';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MODERATOR = 'moderator'
}

class UnauthorizedError extends Error {
    statusCode: number;
    isCustom: boolean;

    constructor(message: string) {
        super(message);
        this.statusCode = 403;
        this.isCustom = true;
    }
}

const authorize = (allowedRoles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new UnauthorizedError('Authentication required');
            }

            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.findOne({
                where: { userId: req.user.id },
                select: ['userId', 'role']
            });

            // Check if user role is allowed
            if (!user || !allowedRoles.includes(user.role as UserRole)) {
                throw new UnauthorizedError('Insufficient permissions');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

// Preset middleware functions
export const isAdmin = authorize([UserRole.ADMIN]);
export const isModerator = authorize([UserRole.MODERATOR, UserRole.ADMIN]);
export const isAdminOrModerator = authorize([UserRole.ADMIN, UserRole.MODERATOR]);

export default authorize;