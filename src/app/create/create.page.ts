import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const Parse = require('parse');


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  infoForm: FormGroup;

  constructor(public router: Router,
    private formBuilder: FormBuilder) {
    this.infoForm = this.formBuilder.group({
      'player_name': [null, Validators.required],
      'player_score': [null, Validators.required]
    });
  }

  ngOnInit() {
  }


  saveInfo() {

    const GameScore = Parse.Object.extend('GameScore');
    const gameScore = new GameScore();

    gameScore.set('score', this.infoForm.value.player_score);
    gameScore.set('playerName', this.infoForm.value.player_name);

    gameScore.save()
      .then(() => {
        // Execute any logic that should take place after the object is saved.
        this.router.navigate(['/detail/' + gameScore.id]);

      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      });
  }

}
