import babel from 'vite-plugin-babel';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/project-hosts/homeBuddy/',
    plugins: [
        react(),
        babel({
            babelConfig: {
                plugins: [
                    ['babel-plugin-react-compiler', {
                        compilationMode: 'all'
                    }],
                ],
            },
        }),
    ],
});
