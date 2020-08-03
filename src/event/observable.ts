import { Emitter, Event, Disposable } from 'util-kit';


export class Observable extends Disposable {


  private _onModified = new Emitter();

  readonly onModified = this._onModified.event;

  private _onMoved = new Emitter();

  readonly onMoved = this._onMoved.event;

  private readonly _onDidUpdate = this._register(new Emitter<this>());

	readonly onDidUpdate: Event<this> = this._onDidUpdate.event;



}
