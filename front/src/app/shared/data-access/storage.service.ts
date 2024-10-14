import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class StorageServide {

    private _storage = localStorage;

    // constructor(private  _storag){}

    get<T>(key: string): T | null {
        const value = this._storage.getItem(key);

        if (!value) return null;
        return JSON.parse(value) as T;
    }

    set(key: string, value: any) {
        const stringValue = JSON.stringify(value);
        console.log("🚀 ~ StorageService ~ stringValue:", stringValue);
        this._storage.setItem(key, stringValue);
    }

    remove(key: string) {
        this._storage.removeItem(key);
    }

}