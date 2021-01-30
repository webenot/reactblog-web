import React, { Component } from 'react';

import { ApiService } from '@reactblog/ui/services/api.service';
import { resolve } from '@reactblog/core/annotations';
import { DI } from '@reactblog/ui/annotations';

@DI
export class MainPage extends Component {

  @resolve
  private readonly apiService: ApiService | undefined;

  render () {
    console.log(this.apiService.get('/'));
    return (
      <div>Some text from main page</div>
    );
  }
}
