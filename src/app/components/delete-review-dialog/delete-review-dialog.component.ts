import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-review-dialog',
  templateUrl: './delete-review-dialog.component.html',
  styleUrls: ['./delete-review-dialog.component.scss']
})
export class DeleteReviewDialogComponent {
  entity!:string;
  constructor(
    public dialogRef: MatDialogRef<DeleteReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.entity=data.entity;
  }

  onCancelClick(): void {
    this.dialogRef.close(false); 
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
