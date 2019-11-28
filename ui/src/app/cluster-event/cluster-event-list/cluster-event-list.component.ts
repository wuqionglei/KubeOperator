import {Component, Input, OnInit} from '@angular/core';
import {Cluster} from '../../cluster/cluster';
import {ClusterEventSearch} from '../cluster-event-search';
import {ClusterEventService} from '../cluster-event.service';

@Component({
  selector: 'app-cluster-event-list',
  templateUrl: './cluster-event-list.component.html',
  styleUrls: ['./cluster-event-list.component.css']
})
export class ClusterEventListComponent implements OnInit {
  @Input() currentCluster: Cluster;
  search = new ClusterEventSearch();
  items = [];
  currentPage = 1;
  pageSize = 10;
  totalItems: number;
  loading = true;

  constructor(private clusterEventService: ClusterEventService) {
  }

  ngOnInit() {
    this.listClusterEvent();
  }

  listClusterEvent() {
    this.loading = true;
    this.search.limitDays = 7;
    this.search.size = this.pageSize;
    this.search.currentPage = this.currentPage;
    this.clusterEventService.listClusterEvents(this.currentCluster.name, this.search).subscribe(res => {
      this.items = res.items;
      this.totalItems = res.total;
      this.loading = false;
    });
  }
}
