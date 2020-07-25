import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-generate-style',
    templateUrl: './generate-style.component.html',
    styleUrls: ['./generate-style.component.scss']
})
export class GenerateStyleComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

}
