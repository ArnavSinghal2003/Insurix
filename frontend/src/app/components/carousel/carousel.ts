import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- This import is needed for ngStyle

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
  // Add CommonModule to the imports array to enable directives like ngStyle and ngFor.
  standalone: true,
  imports: [CommonModule]
})
export class Carousel implements OnInit, OnDestroy {
  // Array of image objects for the carousel
  images = [
    { src: 'assets/carousel_1.jpg', alt: 'Home Insurance' },
    { src: 'https://i.ytimg.com/vi/fHLGtYbsbpk/maxresdefault.jpg', alt: 'Life Insurance' },
    { src: 'https://img.freepik.com/premium-vector/registration-health-insurance-desktop_667176-426.jpg?w=740', alt: 'Health Insurance' },
    { src: 'https://i.pinimg.com/736x/91/00/80/910080d3b1322f41676a74e9fff1a160.jpg', alt: 'Travel Insurance' },
  ];
 
  currentSlide = 0;
  
  private slideInterval: any;

  
  ngOnInit(): void {
    this.startSlideShow();
  }

  
  ngOnDestroy(): void {
    this.stopSlideShow();
  }

  startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 3000); 
  }


  stopSlideShow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
