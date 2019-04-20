import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() avatar: string;
  @Input() name: string;
  @ViewChild('avatarComponent') avatarComponent: ElementRef;
  public abbreviation = '';
  constructor() { }

  ngOnInit() {
    this.createAvatar();
  }

  /**
   * Method selects which type of avatar will be generated
   */
  private createAvatar(): void {
    if (this.avatar) {
      this.avatarComponent.nativeElement.style.backgroundImage = `url(${this.avatar})`;
      return;
    } else if (this.name) {
      this.abbreviation = this.generateAbbreviation();
    }
    this.avatarComponent.nativeElement.style.backgroundColor = this.getRandomColor(4);
  }

  /**
   * Method generates abbreviation from name
   * @returns - Two uppercase first letters of firstName and lastName or two first letters of one word
   */
  private generateAbbreviation(): string {
    const words = this.name.split(' ');
    return words.length > 1 ?
      words
        .map(word => word.slice(0, 1).toUpperCase())
        .join('') :
      words[0].slice(0, 2).toUpperCase();
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
}
