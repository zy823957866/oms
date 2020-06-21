import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationAnimation } from '../../shared/animations/navigation.animation';
import { ResourceService } from 'src/app/framework/core/services/resource.service';


@Component({
  selector: 'oms-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: NavigationAnimation,
  encapsulation: ViewEncapsulation.None
})

export class NavCollapseComponent implements OnInit {
  @HostBinding('class') classes = 'navigation-collapse navigation-item';
  @HostBinding('class.open') public isOpen = false;

  @Input() item: any;
  //语言
  @Input() lang: string="zh_CN";
 

  //当前路由父节点
  public currentNodeClass: string='';

  constructor(private resourceService: ResourceService, private router: Router) {
    router.events.subscribe(
      (event) => {

        if (event instanceof NavigationEnd) {
          if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
            this.expand();
          } else {
            //TODO 先注释自动关闭其它菜单
            // this.collapse();
          }
        }
      }
    );

    this.resourceService.onNavigationCollapseToggled.subscribe(
      (clickedItem) => {
        if (clickedItem && clickedItem.children) {
          if (this.isChildrenOf(this.item, clickedItem)) {
            return;
          }

          if (this.isUrlInChildren(this.item, this.router.url)) {
            return;
          }

          if (this.item !== clickedItem) {
            //TODO 暂时先注释掉菜单自动收缩功能
            // this.collapse();
          }
        }
      }
    );
  }

  ngOnInit() {
    if (this.isUrlInChildren(this.item, this.router.url)) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  toggleOpen(e) {
    e.preventDefault();

    this.isOpen = !this.isOpen;
    this.resourceService.onNavigationCollapseToggled.emit(this.item);
    this.resourceService.onNavigationCollapseToggle.emit();
  }

  expand() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.resourceService.onNavigationCollapseToggle.emit();
  }

  collapse() {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.resourceService.onNavigationCollapseToggle.emit();
  }

  isChildrenOf(parent, item) {
    if (!parent.children) {
      return false;
    }

    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    for (const children of parent.children) {
      if (children.children) {
        return this.isChildrenOf(children, item);
      }
    }
  }

  isUrlInChildren(parent, url) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (this.isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (parent.children[i].url === url || url === parent.children[i].url) {
        return true;
      }
    }

    return false;
  }
}
