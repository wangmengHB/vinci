import { Emitter, Event, Disposable } from 'util-kit';


export class ShapeEvent extends Disposable {


  
  private readonly _onAdded = this._register(new Emitter<this>());

  readonly onAdded: Event<this> = this._onAdded.event;

  private readonly _onRemoved = this._register(new Emitter<this>());

  readonly onRemoved: Event<this> = this._onRemoved.event;

  private readonly _onSelected = this._register(new Emitter<this>());

  readonly onSelected: Event<this> = this._onSelected.event;

  private readonly _onUnSelected = this._register(new Emitter<this>());

  readonly onUnSelected: Event<this> = this._onUnSelected.event;

  private readonly _onModified = this._register(new Emitter<this>());

  readonly onModified: Event<this> = this._onModified.event;



  

  fire(type: string) {
    const eventName = `_${type}`;
    if (this[eventName] && this[eventName].fire) {
      this[eventName].fire(this);
    }
  }



}

