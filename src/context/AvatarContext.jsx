import React, { createContext, useContext, useState, useCallback } from 'react';

const AvatarContext = createContext();

export const useAvatars = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error('useAvatars must be used within an AvatarProvider');
    }
    return context;
};

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
            const targetUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${idsParam}&size=420x420&format=Png&isCircular=false`;
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);

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
