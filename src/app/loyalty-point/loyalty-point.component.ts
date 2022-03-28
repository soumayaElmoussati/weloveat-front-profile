import { Component, OnInit,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-loyalty-point',
  templateUrl: './loyalty-point.component.html',
  styleUrls: ['./loyalty-point.component.scss']
})

export class LoyaltyPointComponent implements OnInit {
  cart: any = [];
  isConnected: boolean;
  loyaltypoints:number;
  loyalty_points : any;
  pointForm = new FormGroup({
    nbLoyaltyPoint: new FormControl('', [Validators.required, Validators.min(0), Validators.max(this.data) ]),
  })

  constructor(
    private cartS: CartService,
    private userS: UserService,
    private tokenS: TokenService,
    public dialogRef: MatDialogRef<LoyaltyPointComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    ) {
      console.log('my data', this.data);
  
  
  
    

    this.isConnected = this.tokenS.getToken();
     }

  ngOnInit(): void {
    
  }
  getLoyaltyPoints() {
    this.userS.getLoyaltyPoint().subscribe(

      data => {
        this.loyalty_points = data.loyalty_points;
        console.log('loy', data);
      },
      error => {
        console.log(error);
      }
    )

  }

  setLoyaltyPoints(){
      if(this.pointForm.valid){
        this.cartS.applyLoyaltyPoint(this.pointForm.get('nbLoyaltyPoint').value);
        this.dialogRef.close(); 
       
      }
  }
}
