/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test.js';
import 'zone.js/dist/async-test.js';
import 'zone.js/dist/fake-async-test.js';
import 'zone.js/dist/task-tracking.js';
import 'reflect-metadata/Reflect';

// This hack is needed to get jasmine, node and zone working inside bazel.
// Initialize jasmine by calling jasmineCore boot. This will initialize
// global.jasmine so that it can be patched by zone.js jasmine-patch.js.
const jasmineCore: any = require('jasmine-core');
jasmineCore.boot(jasmineCore);
import 'zone.js/dist/jasmine-patch.js';

(global as any).isNode = true;
(global as any).isBrowser = false;

// Init TestBed
import {TestBed} from '@angular/core/testing';
import {ServerTestingModule, platformServerTesting} from '@angular/platform-server/testing';
import {patchTestBedToDestroyFixturesAfterEveryTest} from './patch-testbed';

const testBed = TestBed.initTestEnvironment(ServerTestingModule, platformServerTesting());
patchTestBedToDestroyFixturesAfterEveryTest(testBed);
