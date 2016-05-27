/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
import { expect } from 'chai';

import Object from '../../src/logics/Object';

describe('[class] Object', () => {
  describe('[method] constructor', () => {
    beforeEach(() => {
      this.street = new Object('street', [], 1);
    });

    it('street should be initialized as street with 1 point', () => {
      expect(this.street.getType()).equal('street');
      expect(this.street.getPoints()).equal(1);
    });
  });

  describe('[method] isMarkable', () => {
    beforeEach(() => {
      this.streetA = new Object('street', [], 1);
      this.streetB = new Object('street', [this.streetA], 1);
      this.villageA = new Object('village', [this.streetB], 1);
    });

    it('streetA is markable because it does not have a linked street', () => {
      expect(this.streetA.isMarkable()).true;
    });

    it('streetB is not markable because it has a not marked linked street', () => {
      expect(this.streetB.isMarkable()).false;
    });

    it('villageA is not markable because it has a not marked linked street', () => {
      expect(this.villageA.isMarkable()).false;
    });
  });

  describe('[method] markObject', () => {
    beforeEach(() => {
      this.streetA = new Object('street', [], 1);
      this.streetB = new Object('street', [this.streetA], 1);
      this.villageA = new Object('village', [this.streetB], 1);
      this.streetC = new Object('street', [this.streetB], 1);
      this.villageB = new Object('village', [this.streetC, this.villageA], 1);
    });

    it('streetA returns true after marked', () => {
      expect(this.streetA.markObject()).true;
    });

    it('streetA can not be marked a second time', () => {
      this.streetA.markObject();
      expect(this.streetA.isMarkable()).false;
      expect(this.streetA.markObject()).false;
    });

    it('streetB is markable after streetA is marked', () => {
      this.streetA.markObject();
      expect(this.streetB.isMarkable()).true;
    });

    it('villageA is markable after streetA and streetB are marked', () => {
      this.streetA.markObject();
      this.streetB.markObject();
      expect(this.villageA.isMarkable()).true;
    });

    it('villageB is not markable if have linked streets because villageA is not marked', () => {
      this.streetA.markObject();
      this.streetB.markObject();
      this.streetC.markObject();
      expect(this.villageB.isMarkable()).false;
    });

    it('villageB is markable if have linked streets because villageA is marked', () => {
      this.streetA.markObject();
      this.streetB.markObject();
      this.streetC.markObject();
      this.villageA.markObject();
      expect(this.villageB.isMarkable()).true;
    });
  });
});
