import React from 'react';
import { ok } from './ok';
import Styles from './style.module.scss';

export default function hehe() {
  return <div className={Styles.abc}>{ok('Paul')}123</div>;
}
