import React from 'react';
import { ok } from './ok';
import Styles from './style.module.scss';
import S from './style.module.less';
import S2 from './style.less';
import { TimePicker } from 'antd';

export default function hehe() {
  console.log('heheheheheh');
  return (
    <div className="less2">
      <div>{ok('Paul')}123</div>
      <div className={Styles.dq}>
        <TimePicker />
      </div>
    </div>
  );
}
