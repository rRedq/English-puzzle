import CreateElement from '../create-element';
import './level-difficulties.scss';
import type { LevelsData } from '../../types/types';
import { select } from '../../utils/tag-functions';
import { createContainer } from '../../utils/helper-functions';
import type App from '../../app';
import { getProgressStorage, getStorage } from '../../utils/functions';

export default class Levels extends CreateElement {
  private app: App;

  private currentLevel: LevelsData;

  private currentRound: number;

  private roundsCount: number;

  private levelSelect: CreateElement = select({ className: 'level__select' });

  private roundSelect: CreateElement = select({ className: 'level__select' });

  constructor(app: App, level: LevelsData, round: number, roundsCount: number) {
    super({ tag: 'div', className: 'level' });
    this.app = app;
    this.currentLevel = level;
    this.currentRound = round + 1;
    this.roundsCount = roundsCount;
    this.levelSelect.addEventListener('change', this.changeLevelSelect);
    this.roundSelect.addEventListener('change', this.changeRoundSelect);
    this.createLevels();
  }

  private createLevels() {
    const rounds = getProgressStorage(this.currentLevel);
    const level = getStorage<LevelsData[]>('progressLevel');
    createContainer(this, this.levelSelect, 6, 'Level', this.currentLevel.toString(), level);
    createContainer(this, this.roundSelect, this.roundsCount, 'Round', this.currentRound.toString(), rounds);
  }

  private changeLevelSelect = () => {
    const value = this.levelSelect.getNode() as HTMLSelectElement;
    const level: LevelsData = Number(value.value) as LevelsData;

    this.app.startGame({ level, round: 0, word: 0 });
  };

  private changeRoundSelect = () => {
    const value = this.roundSelect.getNode() as HTMLSelectElement;
    const round: number = Number(value.value) - 1;

    this.app.startGame({ level: this.currentLevel, round, word: 0 });
  };
}
