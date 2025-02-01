import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ConfirmButtonComponent } from './confirm-button/confirm-button.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DateInputComponent } from './date-input/date-input.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    CustomSelectComponent,
    GenericModalComponent,
    SearchInputComponent,
    PaginatorComponent,
    SpinnerComponent,
    DataTableComponent,
    ConfirmButtonComponent,
    NotificationsComponent,
    DateInputComponent,
    FileUploaderComponent,
    TooltipComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomSelectComponent,
    GenericModalComponent,
    SearchInputComponent,
    PaginatorComponent,
    SpinnerComponent,
    DataTableComponent,
    ConfirmButtonComponent,
    NotificationsComponent,
    DateInputComponent,
    FileUploaderComponent,
    TooltipComponent,
    AvatarComponent
  ]
})
export class SharedModule {}
