import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() src: string | null = null;
  @Input() alt: string = 'Avatar';
  @Input() size: number = 50;
  @Input() borderRadius: string = '50%'; // Full circle by default
  @Input() initials: string = '';

  constructor() {}
}
