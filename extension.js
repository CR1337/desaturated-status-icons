const { Clutter } = imports.gi;
const Main = imports.ui.main;

class Extension {
    constructor() {
    }

    enable() {
        this._desaturate_effect = new Clutter.DesaturateEffect();
        this._actor_added_signal_id = Main.panel._rightBox.connect(
            'actor-added', this._actor_added_event_handler
        )
        this._desaturate_all_icons();
    }

    disable() {
        Main.panel._rightBox.disconnect(this._actor_added_signal_id);
        this._remove_effect();
        this._desaturate_effect = null;
    }

    _actor_added_event_handler(box, actor) {
        actor.add_effect(this._desaturate_effect);
    }

    _get_tray() {
        return Main.panel._rightBox.get_children().slice(0, -1);
    }

    _desaturate_all_icons() {
        for (const actor of this._get_tray()) {
            actor.add_effect(this._desaturate_effect);
        }
    }

    _remove_effect() {
        for (const actor of this._get_tray()) {
            actor._remove_effect(this._desaturate_effect);
        }
    }
}

function init() {
    return new Extension();
}
