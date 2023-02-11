const { Clutter } = imports.gi;
const Main = imports.ui.main;

class Extension {
    constructor() {
    }

    enable() {
        this._actor_added_signal_id = Main.panel._rightBox.connect(
            'actor-added', this._actor_added_event_handler
        )
        this._add_effects();
    }

    disable() {
        Main.panel._rightBox.disconnect(this._actor_added_signal_id);
        this._remove_effects();
    }

    _actor_added_event_handler(_, actor) {
        actor.add_effect(new Clutter.DesaturateEffect());
    }

    _get_tray() {
        return Main.panel._rightBox.get_children();
    }

    _add_effects() {
        for (let actor of this._get_tray()) {
            actor.add_effect(new Clutter.DesaturateEffect());
        }
    }

    _remove_effects() {
        for (let actor of this._get_tray()) {
            for (let effect of actor.get_effects()) {
                if (effect instanceof Clutter.DesaturateEffect) {
                    actor.remove_effect(effect);
                }
            }
        }
    }
}

function init() {
    return new Extension();
}
