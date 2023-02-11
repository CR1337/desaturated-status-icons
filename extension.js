/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const { Clutter } = imports.gi;
const Main = imports.ui.main;

class Extension {
    constructor() {
        this._actor_added_signal_id = null;
    }

    enable() {
        this._actor_added_signal_id = Main.panel._rightBox.connect(
            'actor-added', this._actor_added_event_handler
        )
        this._desaturate_all_icons();
    }

    disable() {
        Main.panel._rightBox.disconnect(this._actor_added_signal_id);
    }

    _desaturate_all_icons() {
        const statusArea = Main.panel._rightBox.get_children().slice(0, -1);
        for (const actor of statusArea) {
            actor.add_effect(new Clutter.DesaturateEffect());
        }
    }

    _actor_added_event_handler(box, actor) {
        actor.add_effect(new Clutter.DesaturateEffect());
    }
}

function init() {
    return new Extension();
}
