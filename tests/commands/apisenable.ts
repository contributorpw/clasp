import { spawnSync } from 'child_process';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { CLASP, UNPENDING_EXTRA_TESTS } from '../constants';
import { cleanup, setup } from '../functions';
import { PUBLIC_ADVANCED_SERVICES } from '../../src/apis';

describe('Extra test clasp apis functions', () => {
  before(function() {
    setup();
    if (UNPENDING_EXTRA_TESTS !== true) this.skip();
  });

  PUBLIC_ADVANCED_SERVICES.forEach(service => {
    it(`should enable ${service.serviceId}`, () => {
      const result = spawnSync(CLASP, ['apis', 'enable', service.serviceId], {
        encoding: 'utf8',
      });
      expect(result.status).to.equal(0);
      expect(result.stdout).to.contain(`Enabled ${service.serviceId} API.`);
    });
  });
  after(cleanup);
});
