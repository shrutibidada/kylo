import {PreviewDataSet} from "../catalog/datasource/preview-schema/model/preview-data-set";
import {SparkDataSet} from "./spark-data-set.model";
import {FlowChart} from "../visual-query/build-query/flow-chart/model/flow-chart.model";
import {Feed} from "./feed/feed.model";
import {ObjectUtils} from "../../common/utils/object-utils";
import {FeedTableDefinition} from "./feed/feed-table-definition.model";
import {FeedTableSchema} from "./feed/feed-table-schema.model";
import ChartDataModel = FlowChart.ChartDataModel;
import {KyloObject} from "../../common/common.model";


export interface SampleFile{
    /**
     * the file
     */
    fileLocation?:string;

    /**
     * the name of the local file being uploaded
     */
    localFileName?:string;
    /**
     * the local file upload object
     */
    localFileObject?:any //file object
    /**
     * did the file change
     */
    sampleFileChanged?:boolean;
    /**
     * Parsing options passed in to create the script
     */
    schemaParser?:any;

    /**
     * Generated script from the server
     */
    script?:string;
}

/**
 * Model for transforming data.
 */
export interface FeedDataTransformation {

    /**
     * List of user data sources
     */
    $datasources: any;

    /**
     * List of selected columns and tables
     */
    $selectedColumnsAndTables: any;

    /**
     * Identifier of the selected data source
     */
    $selectedDatasourceId: any;

    /**
     * Model for the flowchart
     */
    chartViewModel: FlowChart.ChartDataModel;

    /**
     * List of required datasource ids
     */
    datasourceIds: string[];

    /**
     * Script with data transformations
     */
    dataTransformScript: string;

    /**
     * SQL query
     */
    sql: string;

    /**
     * Internal representation of script in query engine.
     */
    states: object;

    /**
     * the local file if selected
     */
    sampleFile?:SampleFile;

    /**
     * Flag to indicate the sampleFile changed and a new query is needed
     * @type {boolean}
     */
    sampleFileChanged?: boolean;


    datasets:SparkDataSet[];

    reset():void;
}

export class DefaultFeedDataTransformation implements FeedDataTransformation, KyloObject {

    public static OBJECT_TYPE:string = 'DefaultFeedDataTransformation'

    public objectType:string = DefaultFeedDataTransformation.OBJECT_TYPE;

    /**
     * List of user data sources
     */
    $datasources: any;

    /**
     * List of selected columns and tables
     */
    $selectedColumnsAndTables: any;

    /**
     * Identifier of the selected data source
     */
    $selectedDatasourceId: any;

    /**
     * Model for the flowchart
     */
    chartViewModel: FlowChart.ChartDataModel;

    /**
     * List of required datasource ids
     */
    datasourceIds: string[];

    /**
     * Script with data transformations
     */
    dataTransformScript: string;

    /**
     * SQL query
     */
    sql: string;

    /**
     * Internal representation of script in query engine.
     */
    states: object;

    /**
     * the local file if selected
     */
    sampleFile?:SampleFile;

    /**
     * Flag to indicate the sampleFile changed and a new query is needed
     * @type {boolean}
     */
    sampleFileChanged?: boolean;


    datasets:SparkDataSet[];

    public constructor(init?: Partial<FeedDataTransformation>) {
        Object.assign(this, init);
        if (this.datasets) {
            //ensure they are of the right class objects
            this.datasets = this.datasets.map(ds => {
                return new SparkDataSet(ds);
            });
        }
        //ensure the chartViewModel is of type ChartDataModel
        if(this.chartViewModel) {
            this.chartViewModel = ObjectUtils.getAs(this.chartViewModel, FlowChart.ChartDataModel);
        }
    }

    reset(){
        console.log("RESET DATA MODEL!!!!!!")
    }

}