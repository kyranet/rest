import ava from 'ava';
import { Routes } from '../dist/src';

ava('sample test', (test): void => {
	test.is(Routes.application(), '/oauth2/applications/@me');
});
