import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmnBorderCard]",
})
export class BorderCardDirective {
  private initialColor: string = "#f5f5f5";
  private defaultColo: string = "#009688";
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setColor(this.initialColor);
  }

  @Input("pkmnBorderCard") borderColor: string;

  @HostListener("mouseenter") onMouseEnter() {
    this.setColor(this.borderColor || this.defaultColo);
  }
  @HostListener("mouseleave") onMouseLeave() {
    this.setColor(this.initialColor);
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }
  private setColor(color: string) {
    const border = `solid 4px ${color}`;
    this.el.nativeElement.style.border = border;
  }
}
