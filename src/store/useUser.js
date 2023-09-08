'use client';

import { create } from 'zustand'

import UserApi from '@/lib/api/user_api';

const useUser = create((set) => ({
    isLoggedIn: false,
    avatar: null,
    createdAt: null,
    username: null,
    name: null,
    email: null,
    isVerified: null,
    token: null,

    login: async (username, password) => {
        const response = await UserApi.login(username, password);
        if (response.code === 400) return;

        set((state) => {
            state.isLoggedIn = true;

            state.avatar = response.record.avatar;
            state.createdAt = response.record.createdAt;
            state.username = response.record.username;
            state.name = response.record.name;
            state.email = response.record.email;
            state.isVerified = response.record.verified;
            state.token = response.token;

            return state;
        });

        return response;
    },
    logout: () => set((state) => {
        state.isLoggedIn = false;

        state.avatar = null;
        state.createdAt = null;
        state.username = null;
        state.name = null;
        state.email = null;
        state.isVerified = null;
        state.token = null;

        return state;
    })
}));

export default useUser;