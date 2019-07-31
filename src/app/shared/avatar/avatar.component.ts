import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar" #avatarComponent (click) = "emitChange()">
      <ng-template [ngIf]="abbreviation">{{abbreviation}}</ng-template>
      <mat-icon *ngIf="!abbreviation && !checkValue(avatar)">person_outline</mat-icon>
    </div>`,
  styles: [`
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    color: white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .avatar > mat-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
  }
  `]
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() avatar: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() editable = false;
  private backgroundColor: string;
  @ViewChild('avatarComponent') avatarComponent: ElementRef;
  public abbreviation = '';
  @Output() changeAvatar = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.createAvatar();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const changesKeys = Object.keys(changes);
    changesKeys.forEach(variable => {
      this[variable] = changes[variable].currentValue;
    });
    this.updateAvatar();
  }

  /**
   * Method selects which type of avatar will be generated
   */
  private createAvatar(): void {
    this.abbreviation = '';
    if (this.checkValue(this.avatar)) {
      this.backgroundColor = 'rgb(255,255,255)';
      this.avatarComponent.nativeElement.style.backgroundImage = `url(${this.avatar})`;
    } else if (this.checkValue(this.firstName) && this.checkValue(this.lastName)) {
      this.abbreviation = this.generateAbbreviation(this.firstName, this.lastName);
      this.backgroundColor = this.getRandomColor(4);
    } else {
      this.backgroundColor = this.getRandomColor(4);
    }
    this.avatarComponent.nativeElement.style.backgroundColor = this.backgroundColor;
  }

  /**
   * Method updates existed avatar
   */
  private updateAvatar(): void {
    this.abbreviation = '';
    if (this.checkValue(this.avatar)) {
      this.avatarComponent.nativeElement.style.backgroundColor = 'white';
      this.avatarComponent.nativeElement.style.backgroundImage = `url(${this.avatar})`;
    } else if (this.checkValue(this.firstName) && this.checkValue(this.lastName)) {
      this.abbreviation = this.generateAbbreviation(this.firstName, this.lastName);
    }
  }
  /**
   * Method generates abbreviation from name
   * @returns - Two uppercase first letters of firstName and lastName
   */
  private generateAbbreviation(firstName: string, lastName: string): string {
    const words = [firstName, lastName];
    return words.every(word => this.checkValue(word)) ?
      words
        .map(word => word.slice(0, 1).toUpperCase())
        .join('') :
      '';
  }

  /**
   * Method generates random rgb color
   * @param brightness - Level of brightness (0-5)
   */
  private getRandomColor(brightness: number): string {
    const rgb = new Array(3)
      .fill(256)
      .map(color => color * Math.random());
    const mix = new Array(3)
      .fill(51)
      .map(color => color * brightness);
    const mixedRGB = rgb
      .map((color, index) => color + mix[index])
      .map(x => Math.round(x / 2));
    return `rgb(${mixedRGB.join(',')})`;
  }

  /**
   * Method checks if value has data
   * @param value - Data
   */
  public checkValue(value: string): boolean {
    return value !== undefined && value !== null && value.trim() !== '';
  }

  private emitChange() {
    if ( this.editable ) { this.changeAvatar.emit(); }
  }
}
