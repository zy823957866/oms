import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
    
    public set(key: string, value: string): void {
        window.localStorage.setItem(key, value)
    }

    public get(key: string): string {
        return window.localStorage.getItem(key) || '';
    }

    public setObject(key: string, value: any): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    public getObject(key: string): any {
        return JSON.parse(window.localStorage.getItem(key)) || {};
    }

    public remove(key: string): any {
        window.localStorage.removeItem(key);
    }

}
