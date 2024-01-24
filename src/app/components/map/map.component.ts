import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  search!: string;
  display: any;
  center: google.maps.LatLngLiteral = { lat: 46.7712, lng: 23.6236 };
  zoom: number = 20;
  latitude!: any;
  longitude!: any;
  @Output() markerChanged = new EventEmitter<google.maps.LatLngLiteral>();
  marker!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
  };
  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.marker = this.center;
        this.markerChanged.emit(this.marker)
      });
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.marker = this.center
      this.markerChanged.emit(this.marker)
    });
  }

  changeMarker(event: google.maps.MapMouseEvent) {
    this.marker = (event.latLng?.toJSON()) || { lat: 46.7712, lng: 23.6236 };
    this.markerChanged.emit(this.marker);
  }
}
