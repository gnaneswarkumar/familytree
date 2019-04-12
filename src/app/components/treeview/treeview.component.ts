import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MemberService} from '../../services/member.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
/*interface FoodNode {
  name: string;
  children?: FoodNode[];
}*/

/*const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];*/

interface TreeNode {
  member_id: number;
  family_id: number;
  name: string;
  gender: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource();

  constructor(private memberService:MemberService) { }
   hasChild = (_: number, node) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.getFamilyTree();
  }

  getFamilyTree():void{
    this.memberService.getTree().subscribe(members=>this.dataSource.data = members);
  }

}
