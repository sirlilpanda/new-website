import { redirect } from '@sveltejs/kit';
    
export function load() {
    throw redirect(307, 'https://www.linkedin.com/in/logan-henderson-529865268/');
}