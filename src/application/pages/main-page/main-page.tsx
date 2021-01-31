import React, { Component } from 'react';

import { MetaService } from 'Services/meta.service';
import { resolve } from '@reactblog/core/annotations';
import { DI, load } from '@reactblog/ui/annotations';

@DI
export class MainPage extends Component {

  @resolve
  private readonly metaService: MetaService | undefined;

  @load('BROWSER')
  async load () {
    await this.metaService.loadMeta('BROWSER');
  }

  @load('SERVER')
  async loadData () {
    await this.metaService.loadMeta('SERVER');
  }

  render () {
    return (
      <div>Some text from main page</div>
    );
  }
}
