import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute
  ) {}

  getparamid: any;
  ngOnInit() {
    this.getparamid = this.router.snapshot.paramMap.get("id");
    this.service.getSingleData(this.getparamid).subscribe((res) => {
      this.userForm.patchValue({
        name: res.data[0].name,
        email: res.data[0].email
      });
    });
  }
  userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
  });
  data: any;
  userSubmit() {
    this.service.createData(this.userForm.value).subscribe((res) => {
      this.data = res;
    });
  }
  userUpdate() {
    this.service
      .updateData(this.userForm.value, this.getparamid)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
