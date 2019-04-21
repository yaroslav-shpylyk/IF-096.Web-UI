import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() avatar: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @ViewChild('avatarComponent') avatarComponent: ElementRef;
  public abbreviation = '';
  constructor() { }

  ngOnInit() {
    this.createAvatar();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const changesKeys = Object.keys(changes);
    changesKeys.forEach(variable => {
      this[variable] = changes[variable].currentValue;
    });
    this.createAvatar();
  }

  /**
   * Method selects which type of avatar will be generated
   */
  private createAvatar(): void {
    this.abbreviation = '';
    if (this.checkValue(this.avatar)) {
      this.avatarComponent.nativeElement.style.backgroundColor = 'white';
      this.avatarComponent.nativeElement.style.backgroundImage = `url(${this.avatar})`;
    } else if (this.checkValue(this.firstName) && this.checkValue(this.lastName)) {
      this.abbreviation = this.generateAbbreviation();
      this.avatarComponent.nativeElement.style.backgroundColor = this.getRandomColor(4);
    } else {
      this.avatarComponent.nativeElement.style.backgroundColor = this.getRandomColor(4);
    }
  }

  /**
   * Method generates abbreviation from name
   * @returns - Two uppercase first letters of firstName and lastName or two first letters of one word
   */
  private generateAbbreviation(): string {
    const words = [this.firstName, this.lastName];
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
  public checkValue(value: any): boolean {
    return value !== undefined && value !== null && value.trim() !== '';
  }
}
