import { h } from 'preact';
import { padding } from './style';

export default function Summary(props){
    return(
        <div style={padding}>
            <div class="mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Öszesítés</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <p>
                        Kérdések száma: {props.qNum}
                    </p>
                    <p>
                        Felhasználók száma: {props.uNum}
                    </p>
                </div>
            </div>
        </div>
    );
}