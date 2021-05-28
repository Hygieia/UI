import { IClickListItem } from 'src/app/shared/charts/click-list/click-list-interfaces';

export interface IClickListDockerVolumeItem extends IClickListItem {
	'mountpoint': any;
	'name': any;
	'scope': any;
	'driver': any;
	'createdAt': any
}

export interface IClickListDockerContainerItem extends IClickListItem {
	'containerId': any;
	'names': any;
	'image': any;
	'created': any;
	'state': any;
	'current_status': any;
	'bridge': Bridge;
	'mounts': Mount[];
	'processes': any;
	'imageId': any
}

interface Bridge {
	'links': any;
	'ipaddress': any;
	'gateway': any;
	'ipprefixLen': any;
	'ipv6Gateway': any;
	'networkID': any;
	'ipamconfig': any;
	'macAddress': any
}

interface Mount {
	'type': any
	'name': any
	'source': any;
	'destination': any;
	'driver': any;
	'mode': any;
	'rw': any;
	'propagation': any
}

export interface IClickListDockerNetworkItem extends IClickListItem {
	'name': any;
	'networkId': any;
	'created': any;
	'scope': any;
	'attachable': any;
	'ingress': any;
	'driver': 'any'
}

export interface IClickListDockerNodeItem extends IClickListItem {
	'nodeId': any;
	'names': any;
	'image': any;
	'createdat': any;
	'updatedat': any;
	'state': any;
	'status': any;
	'imageId': any
}

export interface IClickListDockerProcessesItem extends IClickListItem {
	'containerId': any;
	'processes': [];
	'titles': [];
}
