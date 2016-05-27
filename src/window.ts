import Board from './logics/Board';
import classic from './themes/classic';

let Dcatan = { Board, themes: { classic } };
(<any>window).Dcatan = Dcatan;
