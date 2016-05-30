import ClassicBoard from './logics/ClassicBoard';
import PlusBoard from './logics/PlusBoard';

let Dcatan = { ClassicBoard, PlusBoard };
(<any>window).Dcatan = Dcatan;
