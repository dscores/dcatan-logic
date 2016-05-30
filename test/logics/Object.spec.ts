/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
import { expect } from 'chai';

import Object, { ObjectType } from '../../src/logics/Object';

describe('[class] Object', () => {
  describe('[method] constructor', () => {
    beforeEach(() => {
      this.street = new Object(ObjectType.Street);
    });

    it('street should be initialized as street with 1 point', () => {
      expect(this.street.isObjectStreet()).true;
      expect(this.street.getObjectPoints()).equal(0);
    });
  });

  describe('[method] isObjectMarkable', () => {
    beforeEach(() => {
      this.streetA = new Object(ObjectType.Street)
        .setObjectPoints(1);
      this.streetB = new Object(ObjectType.Street)
        .setObjectPoints(1)
        .addLinkedObject(this.streetA);
      this.villageA = new Object(ObjectType.Village)
        .setObjectPoints(1)
        .addLinkedObject(this.streetB);
    });

    it('streetA is markable because it does not have a linked street', () => {
      expect(this.streetA.isObjectMarkable()).true;
    });

    it('streetB is not markable because it has a not marked linked street', () => {
      expect(this.streetB.isObjectMarkable()).false;
    });

    it('villageA is not markable because it has a not marked linked street', () => {
      expect(this.villageA.isObjectMarkable()).false;
    });
  });

  describe('[method] markObject', () => {
    beforeEach(() => {
      this.streetA = new Object(ObjectType.Street)
        .setObjectPoints(1);
      this.streetB = new Object(ObjectType.Street)
        .setObjectPoints(1)
        .addLinkedObject(this.streetA);
      this.villageA = new Object(ObjectType.Village)
        .setObjectPoints(1)
        .addLinkedObject(this.streetB);
      this.streetC = new Object(ObjectType.Street)
        .setObjectPoints(1)
        .addLinkedObject(this.streetB);
      this.villageB = new Object(ObjectType.Village)
        .setObjectPoints(1)
        .addLinkedObject(this.streetC)
        .addLinkedObject(this.villageA);
    });

    it('streetA returns true after marked', () => {
      expect(this.streetA.markObject()).true;
    });

    it('streetA can not be marked a second time', () => {
      this.streetA.markObject();
      expect(this.streetA.isObjectMarkable()).false;
      expect(this.streetA.markObject()).false;
    });

    it('streetB is markable after streetA is marked', () => {
      this.streetA.markObject();
      expect(this.streetB.isObjectMarkable()).true;
    });

    it('villageA is markable after streetA and streetB are marked', () => {
      this.streetA.markObject();
      this.streetB.markObject();
      expect(this.villageA.isObjectMarkable()).true;
    });

    it('villageB is not markable if have linked streets because villageA is not marked', () => {
      this.streetA.markObject();
      this.streetB.markObject();
      this.streetC.markObject();
      expect(this.villageB.isObjectMarkable()).false;
    });

    it('villageB is markable if have linked streets because villageA is marked', () => {
      this.streetA.markObject();
      this.streetB.markObject();
      this.streetC.markObject();
      this.villageA.markObject();
      expect(this.villageB.isObjectMarkable()).true;
    });
  });
});
