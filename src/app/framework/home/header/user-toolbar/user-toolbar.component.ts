import { Component } from '@angular/core';
import { StorageService } from 'src/app/framework/core/services/storage.service';
import { HttpApiService } from 'src/app/framework/core/services/http.service';

@Component({
    selector: 'oms-user-toolbar',
    styleUrls: ['./user-toolbar.component.scss'],
    templateUrl: './user-toolbar.component.html'
})

export class OmsUserToolbarComponent {
    isOpen: boolean = false;
    topUrl = 'assets/images/logo/tx.jpg';
    currentUser = this.storageService.getObject('userInfo').userName;

    constructor(
        private storageService: StorageService,
        private httpApiService: HttpApiService
    ) {

        // this.topUrl = environment.theme === 'anta' ? 'assets/images/signin.svg' : 'assets/images/ey-signin.svg';
    }

    ngOnInit() {}

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    logout() {
        this.httpApiService.post("/api-base/v1/auth/logout.do", {}, data => {
            if(data===null) return;
            this.storageService.remove('resources');
            this.storageService.remove('token');
            window.location.href='/login';
        });
    }
}