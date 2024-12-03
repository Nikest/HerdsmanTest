import './index.less';

import { ViewEngine } from '@Modules/ViewEngine';
import { Game } from '@Modules/Game';

const viewElem = document.getElementById('view') as HTMLDivElement;
const scoreInfoElem = document.getElementById('score-info') as HTMLElement;

const viewEngine = new ViewEngine(viewElem, scoreInfoElem);
const game = new Game(3453546435);

document.addEventListener('DOMContentLoaded', () => setTimeout(launch, 1000));

function launch() {
    viewEngine.init(game);
    document.body.classList.add('visible');
}