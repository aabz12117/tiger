import { useContext } from 'react';
import { AvatarContext } from '../context/AvatarContext';

export const useAvatars = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error('useAvatars must be used within an AvatarProvider');
    }
    return context;
};
