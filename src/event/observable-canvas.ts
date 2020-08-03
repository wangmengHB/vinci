import { Emitter, Event, Disposable } from 'util-kit';


export class ObservableCanvas extends Disposable {


  private readonly _onObjectAdded = this._register(new Emitter<this>());

  readonly onObjectAdded: Event<this> = this._onObjectAdded.event;

  private readonly _onObjectRemoved = this._register(new Emitter<this>());

  readonly onObjectRemoved: Event<this> = this._onObjectRemoved.event;

  private readonly _onObjectSelected = this._register(new Emitter<this>());

  readonly onObjectSelected: Event<this> = this._onObjectSelected.event;



  private readonly _onDidUpdate = this._register(new Emitter<this>());

  readonly onDidUpdate: Event<this> = this._onDidUpdate.event;
  




}
