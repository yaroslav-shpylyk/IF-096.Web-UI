import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-subject-attachment-dialog',
  templateUrl: './subject-attachment-dialog.component.html',
  styleUrls: ['./subject-attachment-dialog.component.scss']
})
export class SubjectAttachmentDialogComponent implements OnInit {
  public attachment: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private element: ElementRef
  ) { }

  ngOnInit() {
    const object = this.element.nativeElement.querySelector('embed');
    object.src = this.data.url;
    object.type = this.data.info.fileType;
/*    const image = this.element.nativeElement.querySelector('img');
    image.src = this.data.url;*/
    console.log(this.data);
  }
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
