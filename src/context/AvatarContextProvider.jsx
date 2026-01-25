import React, { useState, useCallback } from 'react';
import { AvatarContext } from './AvatarContext';

export const AvatarProvider = ({ children }) => {
    const [avatars, setAvatars] = useState({});

    const fetchAvatars = useCallback(async (userIds) => {
        // Convert to array and filter out empty or duplicate IDs
        const ids = Array.isArray(userIds) ? userIds : [userIds];
        const uniqueIds = [...new Set(ids.filter(id => id))];

        // Find IDs that are NOT already in the cache
        const missingIds = uniqueIds.filter(id => !avatars[id]);

        if (missingIds.length === 0) return;

        try {
            const idsParam = missingIds.join(',');
            const targetUrl = `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${idsParam}&size=420x420&format=Png&isCircular=false`;
            const response = await fetch(targetUrl);
            const data = await response.json();

            if (data.data) {
                const newAvatars = {};
                data.data.forEach(item => {
                    newAvatars[item.targetId] = item.imageUrl;
                });

                setAvatars(prev => ({
                    ...prev,
                    ...newAvatars
                }));
            }
        } catch (err) {
            console.error("Failed to fetch avatars globally", err);
        }
    }, [avatars]);

    return (
        <AvatarContext.Provider value={{ avatars, fetchAvatars }}>
            {children}
        </AvatarContext.Provider>
    );
};
