import {Place} from "../models/place";
import {Location} from "../models/location";

export class PlacesService {
  private places: Place[] = [];

  addPlace(title: string, description: string, location: Location, imageUrl: string): void {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
  }

  getPlaces(): Place[] {
    return this.places.slice();
  }

  deletePlace(place: Place): void {
    let index = this.places.indexOf(place);
    if (index)
      this.places.splice(index, 1);
  }
}
