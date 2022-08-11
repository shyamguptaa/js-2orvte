var countUserList;
var valueForSearch;
var searchValue;
export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedRowKey: [],
      date: '',
      page: 1,
      sizePerPage: 50,
      filter: [],
      tableDataForAll: [],
      finalTableData: [],
      AddPopUpVisibility: false,
      req_sites: [],
      usedSiteList: [],
      edmRespData: [],
      edmerrormsg: '',
      set_primaryRecipientName: '',
      set_primaryRecipientEmail: '',
      set_secondaryRecipientName: '',
      set_secondaryRecipientEmail: '',
      set_backUpSecondaryRecipientName: '',
      set_backUpSecondaryRecipientEmail: '',
      set_requestingId: '',
      errors: {
        primaryName: '',
        primaryEmail: '',
        secondaryName: '',
        secondaryEmail: '',
        backUpSecondaryName: '',
        backUpSecondaryEmail: '',
      },
      validationflag: false,
      similarflag: false,
      searchValue: '',
      nonManCollateral: '',
      tableCols: [
        {
          dataIndex: 'brand',
          key: 'brand',
          title: 'Brand',
          align: 'center',
        },
        {
          dataIndex: 'primaryName',
          key: 'primaryName',
          title: 'Main Contact',
          align: 'center',
        },
        {
          dataIndex: 'primaryEmail',
          key: 'primaryEmail',
          title: 'Main Contact Email',
          align: 'center',
          render: (text, record, index) => {
            return (
              <React.Fragment>
                <a target="_top" href={'mailto:' + text}>
                  {text}
                </a>
              </React.Fragment>
            );
          },
        },
        {
          dataIndex: 'backupName',
          key: 'backupName',
          title: 'Backup Contact',
          headerAlign: 'center',
          align: 'center',
          width: '114px',
        },
        {
          dataIndex: 'backupEmail',
          key: 'backupEmail',
          title: 'Backup Email',
          headerAlign: 'center',
          align: 'center',
          width: '146px',
          render: (text, record, index) => {
            return (
              <React.Fragment>
                <a target="_top" href={'mailto:' + text}>
                  {text}
                </a>
              </React.Fragment>
            );
          },
        },
        {
          dataIndex: 'secondaryBackUpName',
          key: 'secondaryBackUpName',
          title: 'Secondary Backup Contact',
          headerAlign: 'center',
          // align: "center",
          width: '224px',
        },
        {
          dataIndex: 'secondaryBackUpEmail',
          key: 'secondaryBackUpEmail',
          title: 'Secondary Backup Email',
          headerAlign: 'center',
          align: 'center',
          width: '122px',
          render: (text, record, index) => {
            return (
              <React.Fragment>
                <a target="_top" href={'mailto:' + text}>
                  {text}
                </a>
              </React.Fragment>
            );
          },
        },
      ],
      rowindex: null,
      table2Cols: [
        {
          dataIndex: 'requestingDesc',
          key: 'requestingDesc',
          title: 'Requesting Site',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index
              ? // <Input
                //   defaultValue={text}
                //   id="requestingDesc"
                //   allowClear
                //   onChange={event => this.sethandlechange(record, "requestingDesc", index, event)}
                //   tabIndex={1}
                // />
                text
              : text,
        },
        {
          dataIndex: 'primaryRecipientName',
          key: 'primaryRecipientName',
          title: 'Primary Name ',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index ? (
              <Input
                defaultValue={text}
                id="primaryRecipientName"
                allowClear
                className="edm-inline-input"
                onChange={(event) =>
                  this.sethandlechange(
                    record,
                    'primaryRecipientName',
                    index,
                    event
                  )
                }
                tabIndex={2}
              />
            ) : (
              text
            ),
        },
        {
          dataIndex: 'primaryRecipientEmail',
          key: 'primaryRecipientEmail',
          title: 'Primary Email',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index ? (
              <Input
                defaultValue={text}
                id="primaryRecipientEmail"
                allowClear
                className="edm-inline-input"
                onChange={(event) =>
                  this.sethandlechange(
                    record,
                    'primaryRecipientEmail',
                    index,
                    event
                  )
                }
                tabIndex={3}
              />
            ) : (
              <a target="_top" href={'mailto:' + text}>
                {text}
              </a>
            ),
        },
        {
          dataIndex: 'secondaryRecipientName',
          key: 'secondaryRecipientName',
          title: 'Secondary Name ',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index ? (
              <Input
                defaultValue={text}
                id="secondaryRecipientName"
                allowClear
                className="edm-inline-input"
                onChange={(event) =>
                  this.sethandlechange(
                    record,
                    'secondaryRecipientName',
                    index,
                    event
                  )
                }
                tabIndex={4}
              />
            ) : (
              text
            ),
        },
        {
          dataIndex: 'secondaryRecipientEmail',
          key: 'secondaryRecipientEmail',
          title: 'Secondary Email',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index ? (
              <Input
                defaultValue={text}
                id="secondaryRecipientEmail"
                allowClear
                className="edm-inline-input"
                tabIndex={5}
                onChange={(event) =>
                  this.sethandlechange(
                    record,
                    'secondaryRecipientEmail',
                    index,
                    event
                  )
                }
              />
            ) : (
              <a target="_top" href={'mailto:' + text}>
                {text}
              </a>
            ),
        },
        {
          dataIndex: 'backUpSecondaryRecipientName',
          key: 'backUpSecondaryRecipientName',
          title: 'Backup Secondary Name ',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index ? (
              <Input
                defaultValue={text}
                id="backUpSecondaryRecipientName"
                allowClear
                className="edm-inline-input"
                onChange={(event) =>
                  this.sethandlechange(
                    record,
                    'backUpSecondaryRecipientName',
                    index,
                    event
                  )
                }
                tabIndex={6}
              />
            ) : (
              text
            ),
        },
        {
          dataIndex: 'backUpSecondaryRecipientEmail',
          key: 'backUpSecondaryRecipientEmail',
          title: 'Backup Secondary Email',
          align: 'center',
          editable: true,
          render: (text, record, index) =>
            this.state.rowindex !== null && this.state.rowindex === index ? (
              <Input
                defaultValue={text}
                id="backUpSecondaryRecipientEmail"
                allowClear
                className="edm-inline-input"
                onChange={(event) =>
                  this.sethandlechange(
                    record,
                    'backUpSecondaryRecipientEmail',
                    index,
                    event
                  )
                }
                tabIndex={7}
              />
            ) : (
              <a target="_top" href={'mailto:' + text}>
                {text}
              </a>
            ),
        },

        {
          title: 'Actions',
          headerAlign: 'center',
          align: 'center',
          width: 130,
          fixed: 'right',
          render: (text, record, index) => {
            return (
              <>
                {this.state.rowindex === null ? (
                  <>
                    <Tooltip placement="bottom" title="Edit">
                      <Icon
                        type="edit"
                        className="edmContactIcon"
                        onClick={(event) => {
                          event.stopPropagation();
                          this.editrow(index);
                        }}
                        disabled={
                          this.state.rowindex !== index &&
                          this.state.rowindex !== null
                            ? true
                            : false
                        }
                      />
                    </Tooltip>

                    <Tooltip placement="bottom" title="delete">
                      <Icon
                        type="delete"
                        className="edmContactIcon"
                        onClick={(event) => {
                          this.edmContactDelete(record);
                        }}
                      />
                    </Tooltip>
                  </>
                ) : this.state.rowindex !== null &&
                  this.state.rowindex !== index ? (
                  <Button
                    type="link"
                    disabled={
                      this.state.rowindex !== index &&
                      this.state.rowindex !== null
                        ? true
                        : false
                    }
                  >
                    Disabled{' '}
                  </Button>
                ) : (
                  <>
                    <Tooltip placement="bottom" title="Save">
                      <Icon
                        type="save"
                        className="edmContactIcon"
                        onClick={(event) => {
                          this.editrowSave(record);
                        }}
                      />
                    </Tooltip>

                    <Tooltip placement="bottom" title="cancel">
                      <Icon
                        type="close-circle"
                        className="edmContactIcon"
                        onClick={(event) => {
                          this.editrowCancel();
                        }}
                      />
                    </Tooltip>
                  </>
                )}
              </>
            );
          },
        },
      ],
    };
    this.onChangeOfPagination = this.onChangeOfPagination.bind(this);
    this.edmavaliablesitehandleChange =
      this.edmavaliablesitehandleChange.bind(this);
    this.handleAddEDMContactCancel = this.handleAddEDMContactCancel.bind(this);
  }

  editrow = (index) => {
    this.setState({
      rowindex: index,
    });
  };

  editrowSave = async (record) => {
    let primary_name = record.primaryRecipientName.toString();
    let primary_email = record.primaryRecipientEmail.toString();
    let secondary_name = record.secondaryRecipientName.toString();
    let secondary_email = record.secondaryRecipientEmail.toString();
    let bckp_sec_name = record.backUpSecondaryRecipientName.toString();
    let bckp_sec_email = record.backUpSecondaryRecipientEmail.toString();
    let reqsiteid = record.requestingId.toString();
    let arry_request = {
      primaryRecipientName: primary_name,
      primaryRecipientEmail: primary_email,
      secondaryRecipientName: secondary_name,
      secondaryRecipientEmail: secondary_email,
      backUpSecondaryRecipientName: bckp_sec_name,
      backUpSecondaryRecipientEmail: bckp_sec_email,
      requestingId: reqsiteid,
    };
    await NewItemService.update_uptick_edm_contact_request(
      this.updateedmuptickresponse,
      arry_request
    );
    this.setState({
      rowindex: null,
    });
  };

  updateedmuptickresponse = (response) => {
    if (response?.data?.updateUptickEdmContacts?.status == '200') {
      this.getUptickEDMContactlist();
      toast.success(response.data.updateUptickEdmContacts.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };
  edmContactDelete = async (record) => {
    let reqsiteid = record.requestingId.toString();
    await NewItemService.delete_uptick_edm_contact_request(
      this.deleteedmuptickresponse,
      reqsiteid
    );
  };
  deleteedmuptickresponse = (response) => {
    if (response?.data?.deleteUptickEdm?.status == '200') {
      this.getUptickEDMContactlist();
      toast.success(response.data.deleteUptickEdm.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  clearedmformstate = () => {
    this.setState({
      set_primaryRecipientName: '',
      set_primaryRecipientEmail: '',
      set_secondaryRecipientName: '',
      set_secondaryRecipientEmail: '',
      set_backUpSecondaryRecipientName: '',
      set_backUpSecondaryRecipientEmail: '',
      set_requestingId: '',
    });
  };

  showAddEDMPopup = () => {
    this.getEdmRequstingSite();
    this.setState({
      AddPopUpVisibility: true,
    });
  };

  handleAddEDMContactOnSubmit = async () => {
    let {
      set_primaryRecipientName,
      set_primaryRecipientEmail,
      set_secondaryRecipientName,
      set_secondaryRecipientEmail,
      set_backUpSecondaryRecipientName,
      set_backUpSecondaryRecipientEmail,
      set_requestingId,
      validationflag,
      similarflag,
    } = this.state;

    const errorstate = (str1, str2) => {
      let text = `${str1} & ${str2} cannot be same`;
      this.setState({
        edmerrormsg: text,
        similarflag: true,
      });
    };

    if (
      set_primaryRecipientName &&
      set_primaryRecipientName == set_secondaryRecipientName
    ) {
      errorstate('Primary Name', 'Secondary Name');
    } else if (
      set_primaryRecipientName &&
      set_primaryRecipientName == set_backUpSecondaryRecipientName
    ) {
      errorstate('Primary Name', 'Secondary Backup Name');
    } else if (
      set_secondaryRecipientName &&
      set_secondaryRecipientName == set_backUpSecondaryRecipientName
    ) {
      errorstate('Secondary Name', 'Backup Secondary Name');
    } else if (
      set_primaryRecipientEmail &&
      set_primaryRecipientEmail == set_secondaryRecipientEmail
    ) {
      errorstate('Primary Email', 'Secondary Email');
    } else if (
      set_primaryRecipientEmail &&
      set_primaryRecipientEmail == set_backUpSecondaryRecipientEmail
    ) {
      errorstate('Primary Email', 'Backup Secondary Email');
    } else if (
      set_secondaryRecipientEmail &&
      set_secondaryRecipientEmail == set_backUpSecondaryRecipientEmail
    ) {
      errorstate('Secondary Email', 'Backup Secondary');
    } else {
      this.setState({
        edmerrormsg: '',
        similarflag: false,
      });
    }

    let savre_arry_req = {
      primaryRecipientName: set_primaryRecipientName,
      primaryRecipientEmail: set_primaryRecipientEmail,
      secondaryRecipientName: set_secondaryRecipientName,
      secondaryRecipientEmail: set_secondaryRecipientEmail,
      backUpSecondaryRecipientName: set_backUpSecondaryRecipientName,
      backUpSecondaryRecipientEmail: set_backUpSecondaryRecipientEmail,
      requestingId: set_requestingId,
    };

    console.log(validationflag, 'validationflag', similarflag, 'similarflag');

    if (validationflag == true && similarflag == true) {
      await NewItemService.save_uptick_edm_contact_request(
        this.savenewedmuptickresponse,
        savre_arry_req
      );
    } else {
    }
  };

  savenewedmuptickresponse = (response) => {
    if (response?.data?.saveUptickEdmContact?.status == '200') {
      this.getUptickEDMContactlist();
      toast.success(response.data.saveUptickEdmContact.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
      });
      this.set_timeout_fun();
    } else if (response?.data?.saveUptickEdmContact?.status == '500') {
      this.getUptickEDMContactlist();
      toast.error(response.data.saveUptickEdmContact.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
      });
    } else {
      this.setState({ setLoader: false });
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
      });
      this.set_timeout_fun();
    }
  };

  set_timeout_fun() {
    setTimeout(() => {
      this.setState({
        AddPopUpVisibility: false,
      });
    }, 1500);
  }

  handleAddEDMContactCancel = () => {
    this.setState({
      AddPopUpVisibility: false,
      req_sites: [],
      set_requestingId: '',
    });
  };

  editrowCancel = () => {
    this.setState({
      rowindex: null,
    });
  };

  setrequestingid = (e) => {
    console.log(e.target.value);
    e.stopPropagation();
    this.setState({
      set_requestingId: e.target.value,
    });
  };

  sethandlechange = (record, key, index, event) => {
    event.stopPropagation();
    const newdata = [...this.state.edmRespData];
    this.state.edmRespData[index][key] = event.target.value;
  };

  componentDidUpdate = async (prevProps, prevState) => {};

  getPDmContacts = async () => {
    var resBrands = await NewItemService.get_getPdmContacts_data();
    var brandsListtt = resBrands.data.getPDMContact;
    this.setState({
      finalTableData: brandsListtt,
    });
  };

  getUptickEDMContactlist = async () => {
    var resuptickEdmContact = NewItemService.get_getUptickEdmContacts_data();
    var uptickEdmContact = (await resuptickEdmContact).data.getUptickPDMContact;
    this.setState({
      edmRespData: uptickEdmContact,
    });
  };

  getEdmRequstingSite = async () => {
    let response_req_sites =
      SearchService.get_available_requestingsites_dataaa();
    let response_req_sites1 = (await response_req_sites).data
      .getAvailUptickReqSiteList;
    this.setState({
      req_sites: response_req_sites1,
    });
  };

  componentDidMount = () => {
    this.props.setLoader(true);
    this.getPDmContacts();
    this.getUptickEDMContactlist();
    this.props.setLoader(false);
    this.showAddEDMPopup();

    // this.props.getAsoReqId(this.asoCallBack, this.props.userInfo.userId);
    // this.props.getAssemblySites("112", "N");
    // this.props.getBrands();
    // this.props.getAllReqParam();
    // this.props.getInitialData({
    //   pageNumber: this.state.page,
    //   pageSize: this.state.sizePerPage,
    //   listColumnNames: ["itemStatusList"],
    //   itemStatusList: ["4"],
    //   lastThreeMonthsRecord: true,
    //   filterNames: ["acsItemPo.createdDate"],
    //   filterOrders: ["DESC"]
    // });
  };

  // setRowClassName = record => {
  //   return record.key === this.state.selectedRowKey
  //     ? "selected-row"
  //     : "search-table-row";
  // };

  // asoCallBack = data => {
  //   console.log("in aso");
  // };
  onChangeOfPagination = (value) => {
    this.setState({ page: value });

    this.props.getInitialData({
      pageNumber: value,
      pageSize: this.state.sizePerPage,
      listColumnNames: ['itemStatusList'],
      itemStatusList: '4',
      lastThreeMonthsRecord: true,
      filterNames: ['acsItemPo.createdDate'],
      filterOrders: ['DESC'],
    });
  };
  handleClick = (cell, row) => {
    console.log(cell);
    if (cell) {
      return <a onClick={(e) => this.handleNewItem(row)}>{cell}</a>;
    }
    // if (cell) {
    //   return (
    //     <a
    //       onClick={e => {
    //         e.preventDefault();
    //         console.log(row);
    //         // load new item page
    //       }}
    //     >
    //       {cell}
    //     </a>
    //   );
    // }
  };
  // handleNewItem = async row => {
  //   this.props.setLoader(true);
  //   this.props.printACS(true);
  //   var statusCode = row.statusCode
  //   console.log(row);
  //   /* For ACS item*/
  //   let response = await SearchService.findAcsItem(row.acsId, row.revision);
  //   console.log(response);
  //   if (response.toString().includes("error")) {
  //     console.log("Error occurred while fetching the data", response)
  //     return;
  //   }
  //   let acsItem = response.data.findAcsItem;
  //   console.log(this.props);
  //   this.props.setItems(acsItem, [], [], [], [], []);

  //   if (row.nonManCollateral == "N" && acsItem != null) {
  //     // this.props.history.push("/acs/NewItem");
  //     this.props.history.push({
  //       pathname: '/acs',
  //       state: {
  //         checkPropsUpdateForPrintVal: true
  //       }
  //     });
  //     this.props.history.push({
  //       pathname: "/acs/NewItem",
  //       state: {
  //         statusCode: statusCode,
  //         acsItem: acsItem,
  //         reqSites: this.props.reqSites,
  //         assemblySites: this.props.assemblySites,
  //         brandsData: this.props.brandsData
  //       }
  //     })
  //   }
  //   if ((row.nonManCollateral == "N" || row.nonManCollateral == "Y") && acsItem == null) {
  //     // this.props.setAlertForNewitem(true);
  //     // this.hideAlert();
  //     // this.setState({
  //     //   type: "warning",
  //     //   message: "No Market data found"
  //     return (
  //       <Alert closable onClose={this.closeAlert} message="No Market data found" type="warning" showIcon />
  //     )
  //   }

  //   else if (row.nonManCollateral == "Y" && acsItem != null) {
  //     this.props.history.push({
  //       pathname: '/acs',
  //       state: {
  //         checkPropsUpdateForPrintVal: true
  //       }
  //     });
  //     this.props.history.push({
  //       pathname: "/acs/NewItem",
  //       state: {
  //         nonManCollateral: row.nonManCollateral,
  //         acsItem: acsItem,
  //         reqSites: this.props.reqSites,
  //         assemblySites: this.props.assemblySites,
  //         brandsData: this.props.brandsData,
  //         statusCode: statusCode,
  //       }
  //     });
  //   }
  //   // this.props.history.push("/acs/NewItem" /* objToPass */);
  // };

  closeAlert = () => {
    this.props.setAlertForNewitem(false);
  };
  hideAlert = () => {
    setTimeout(() => {
      this.props.setAlertForNewitem(false);
    }, 5000);
  };

  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={
            title != undefined ? `Search ${title}` : `Search ${dataIndex}`
          }
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() =>
            this.handleTableSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            width: 188,
            marginBottom: 8,
            display: 'block',
            fontSize: 12,
          }}
        />
        <Button
          type="secondary"
          onClick={() => this.handleTableReset(clearFilters)}
          size="small"
          style={{ marginRight: '16px' }}
        >
          Reset
        </Button>
        <Button
          type="primary"
          onClick={() =>
            this.handleTableSearch(selectedKeys, confirm, dataIndex)
          }
          size="small"
        >
          Apply
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="filter" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),

    onFilter: (value, record) => {
      if (record[dataIndex] !== null && record[dataIndex] !== undefined)
        if (value.charAt(0) === value.charAt(0).toLowerCase()) {
          value = value.charAt(0).toUpperCase() + value.slice(1);
        }

      if (dataIndex == 'brand') {
        var brandArr;
        this.props.brandsData.map((d) => {
          if (value != null) {
            if (d.brandName == value) {
              brandArr = d.brandCd;
            }
          } else {
            brandArr = '';
          }
        });
        value = brandArr;
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (dataIndex == 'assemblySite') {
        var assemblySiteArr;
        this.props.assemblySites.map((d) => {
          if (value != null) {
            // if (d.assemblySiteDesc == value) {
            if (d.assemblySiteDesc.includes(value)) {
              assemblySiteArr = d.assemblySiteId;
            }
          } else {
            assemblySiteArr = '';
          }
        });
        value = assemblySiteArr;
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (dataIndex == 'requstingSite') {
        var reqSiteArr;
        this.props.reqSites.map((d) => {
          if (value != null) {
            // if (d.reqSiteDesc.includes(value) == value) {
            if (d.reqSiteDesc.includes(value)) {
              reqSiteArr = d.reqSiteCd;
            }
          } else {
            reqSiteArr = '';
          }
        });

        value = reqSiteArr;
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      } else {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    },

    onFilterDropdownVisibleChange: (visible) => {
      if (this.searchInput !== undefined) {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      }
    },
  });
  handleTableSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(dataIndex);
    if (dataIndex == 'brand') {
      this.props.getInitialData({
        pageNumber: this.state.page,
        pageSize: this.state.sizePerPage,
        listColumnNames: ['itemStatusList'],
        itemStatusList: '4',
        lastThreeMonthsRecord: true,
      });
      var brandArr;
      this.props.brandsData.map((d) => {
        if (selectedKeys[0] != null) {
          if (d.brandName == selectedKeys[0]) {
            brandArr = d.brandCd;
          }
        } else {
          brandArr = '';
        }
      });
      console.log(this.props.landingPageList);
      confirm();
      this.setState({ searchText: brandArr });
    }

    if (dataIndex == 'assemblySite') {
      this.props.getInitialData({
        pageNumber: this.state.page,
        pageSize: this.state.sizePerPage,
        listColumnNames: ['itemStatusList'],
        itemStatusList: '4',
        lastThreeMonthsRecord: true,
      });
      var assemblySiteArr;
      this.props.assemblySites.map((d) => {
        if (selectedKeys[0] != null) {
          if (d.assemblySiteDesc == selectedKeys[0]) {
            assemblySiteArr = d.assemblySiteId;
          }
        } else {
          assemblySiteArr = '';
        }
      });
      console.log(this.props.landingPageList);
      confirm();
      this.setState({ searchText: assemblySiteArr });
    }

    if (dataIndex == 'requstingSite') {
      this.props.getInitialData({
        pageNumber: this.state.page,
        pageSize: this.state.sizePerPage,
        listColumnNames: ['itemStatusList'],
        itemStatusList: '4',
        lastThreeMonthsRecord: true,
      });
      var reqSiteArr;
      this.props.reqSites.map((d) => {
        if (selectedKeys[0] != null) {
          if (d.reqSiteDesc == selectedKeys[0]) {
            reqSiteArr = d.reqSiteCd;
          }
        } else {
          reqSiteArr = '';
        }
      });
      console.log(this.props.landingPageList);
      confirm();
      this.setState({ searchText: reqSiteArr });
    }
    //call the search criteria endpoint
    else {
      this.props.getInitialData({
        pageNumber: this.state.page,
        pageSize: this.state.sizePerPage,
        listColumnNames: ['itemStatusList'],
        itemStatusList: '4',
        lastThreeMonthsRecord: true,
      });
      console.log(this.props.landingPageList);
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }
  };

  handleTableReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  onDrag = (fromIndex, toIndex) => {
    const colsCopy = this.state.tableCols.slice();
    const item = colsCopy.splice(fromIndex, 1)[0];
    colsCopy.splice(toIndex, 0, item);
    this.setState({ tableCols: colsCopy });
  };
  close = () => {
    this.props.resetAlertFlag(false);
  };

  edmavaliablesitehandleChange = (value) => {
    this.setState({ set_requestingId: value });
  };

  edmTableTitle = () => {
    return (
      <>
        <b>EDM CONTACTS BY REQUESTING SITE</b>
        <Button
          class="ant-btn "
          className="edm-contact-title"
          onClick={(event) => {
            this.showAddEDMPopup();
            this.clearedmformstate();
          }}
        >
          Add EDM User
        </Button>
      </>
    );
  };

  edmenablesubmitbutton = () => {
    const {
      set_primaryRecipientName,
      set_primaryRecipientEmail,
      set_backUpSecondaryRecipientEmail,
      set_backUpSecondaryRecipientName,
      set_secondaryRecipientName,
      set_secondaryRecipientEmail,
      set_requestingId,
    } = this.state;
    if (
      set_primaryRecipientName.length > 0 &&
      set_primaryRecipientEmail.length > 0 &&
      set_secondaryRecipientName.length > 0 &&
      set_secondaryRecipientEmail.length > 0 &&
      set_backUpSecondaryRecipientName.length > 0 &&
      set_backUpSecondaryRecipientEmail.length > 0 &&
      set_requestingId.length > 1
    ) {
      return false;
    } else {
      return true;
    }
  };

  handleedmchanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.validationcheck(event.target.name, event.target.value);
  };

  validationcheck = (name, values) => {
    const checkname = (name, value) => {
      if (!isEmpty(value)) {
        if (!/^[a-zA-Z0-9]{1,}$/.test(value)) {
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: 'Special Characters Not Allowed',
              validationflag: false,
            },
          });
        } else {
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: '',
              validationflag: true,
            },
          });
        }
      }
      if (!value) {
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: 'Required',
            validationflag: false,
          },
        });
      } else {
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: '',
            validationflag: true,
          },
        });
      }
    };
    const checkemail = (name, value) => {
      if (!isEmpty(value)) {
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            values
          )
        ) {
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: 'Enter Valid Email',
              validationflag: false,
            },
          });
        } else {
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: '',
              validationflag: true,
            },
          });
        }
      }
      if (!value) {
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: 'Please Enter Email',
            validationflag: false,
          },
        });
      }
    };

    switch (name) {
      case 'set_primaryRecipientName':
        checkname('primaryName', values);
        break;
      case 'set_secondaryRecipientName':
        checkname('secondaryName', values);
        break;
      case 'set_backUpSecondaryRecipientName':
        checkname('backUpSecondaryName', values);
        break;
      case 'set_primaryRecipientEmail':
        checkemail('primaryEmail', values);
        break;
      case 'set_secondaryRecipientEmail':
        checkemail('secondaryEmail', values);
        break;
      case 'set_backUpSecondaryRecipientEmail':
        checkemail('backUpSecondaryEmail', values);
        break;
    }
  };

  render() {
    // console.log("propscheck completed", this.props);
    return (
      <div style={{ marginBottom: '50px' }}>
        <Row className="acs-header-row">
          <Col sm={24}>
            <h5 className="acs-header-name ml-4">EDM Contacts</h5>
          </Col>
        </Row>
        {this.props.loader && <Loader />}
        {this.props.alertFlag && (
          <Row type="flex">
            <Col span={24}>
              <Alert
                closable
                onClose={this.close}
                message={this.props.message}
                type="error"
                showIcon
              ></Alert>
            </Col>
          </Row>
        )}
        <Row type="flex">
          <Col span={24} className="app">
            {/* {this.props.loader && <Loader />} */}
            {this.props.landingPageList ? (
              <>
                <ToastContainer />
                <div>
                  <ResizableTable
                    isSearch={true}
                    title="EDM Contacts"
                    rowClassName={this.setRowClassName}
                    rowKey={(record) => record.acsId}
                    dataSource={this.state.finalTableData}
                    size="small"
                    bordered
                    columns={this.state.tableCols}
                    pagination={false}
                  />

                  {/* <Pagination style={{ float: "right", marginTop: "300px" }}
                  pageSize={50}
                  defaultCurrent={1}
                  onChange={this.onChangeOfPagination}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  current={
                    this.state.page
                  }
                  total={this.state.finalTableData != undefined ? this.state.finalTableData.length : 0} /> */}
                </div>
                <br />

                <div>
                  <ResizableTable
                    isSearch={true}
                    title={this.edmTableTitle}
                    rowClassName={this.setRowClassName}
                    rowKey={(record) => record.acsId}
                    dataSource={this.state.edmRespData}
                    size="small"
                    bordered
                    columns={this.state.table2Cols}
                    pagination={false}
                  ></ResizableTable>
                </div>

                <>
                  <ClosableModal
                    visible={this.state.AddPopUpVisibility}
                    title="Add New EDM Contacts"
                    closable={true}
                    width={'70%'}
                    style={{
                      top: 20,
                      // lineHeight: "0.5",
                    }}
                    onOk={this.handleAddEDMContactOnSubmit}
                    onCancel={this.handleAddEDMContactCancel}
                    footer={[
                      <Button
                        key="back"
                        onClick={this.handleAddEDMContactCancel}
                      >
                        Cancel
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        disabled={this.edmenablesubmitbutton()}
                        onClick={this.handleAddEDMContactOnSubmit}
                      >
                        Submit
                      </Button>,
                    ]}
                  >
                    <>
                      <Form>
                        <div className="gutter-example container">
                          <Row gutter={24} className="edm-Row">
                            <Col sm={4} className="gutter-row label-gutter">
                              <label className="customLabel edm-gutter-label">
                                Primary Name<span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Input
                                  className="field"
                                  name="set_primaryRecipientName"
                                  value={this.state.set_primaryRecipientName}
                                  onChange={this.handleedmchanges}
                                ></Input>
                                {/* {<span className="ast">error</span>} */}
                                {this.state.errors.primaryName && (
                                  <span className="error-msg">
                                    {this.state.errors.primaryName}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col sm={2} className="gutter-row">
                              <label className="customLabel edm-gutter-label">
                                Email<span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Input
                                  className="field"
                                  name="set_primaryRecipientEmail"
                                  value={this.state.set_primaryRecipientEmail}
                                  onChange={this.handleedmchanges}
                                ></Input>
                                {this.state.errors.primaryEmail && (
                                  <span className="error-msg">
                                    {this.state.errors.primaryEmail}
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>

                          <Row gutter={24} className="edm-Row">
                            <Col sm={4} className="gutter-row label-gutter">
                              <label className="customLabel edm-gutter-label">
                                Secondary Name<span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Input
                                  className="field"
                                  name="set_secondaryRecipientName"
                                  value={this.state.set_secondaryRecipientName}
                                  onChange={this.handleedmchanges}
                                ></Input>
                                {this.state.errors.secondaryName && (
                                  <span className="error-msg">
                                    {this.state.errors.secondaryName}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col sm={2} className="gutter-row">
                              <label className="customLabel edm-gutter-label">
                                Email<span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Input
                                  className="field"
                                  name="set_secondaryRecipientEmail"
                                  value={this.state.set_secondaryRecipientEmail}
                                  onChange={this.handleedmchanges}
                                ></Input>
                                {this.state.errors.secondaryEmail && (
                                  <span className="error-msg">
                                    {this.state.errors.secondaryEmail}
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>

                          <Row gutter={24} className="edm-Row">
                            <Col sm={4} className="gutter-row ">
                              <label className="customLabel edm-gutter-label">
                                Backup Secondary Name
                                <span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Input
                                  className="field"
                                  name="set_backUpSecondaryRecipientName"
                                  value={
                                    this.state.set_backUpSecondaryRecipientName
                                  }
                                  onChange={this.handleedmchanges}
                                ></Input>
                                {this.state.errors.backUpSecondaryName && (
                                  <span className="error-msg">
                                    {this.state.errors.backUpSecondaryName}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col sm={2} className="gutter-row">
                              <label className="customLabel edm-gutter-label">
                                Email<span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Input
                                  className="field"
                                  name="set_backUpSecondaryRecipientEmail"
                                  value={
                                    this.state.set_backUpSecondaryRecipientEmail
                                  }
                                  onChange={this.handleedmchanges}
                                ></Input>
                                {this.state.errors.backUpSecondaryEmail && (
                                  <span className="error-msg">
                                    {this.state.errors.backUpSecondaryEmail}
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>

                          <Row gutter={24} className="edm-Row">
                            <Col sm={4} className="gutter-row">
                              <label className="customLabel edm-gutter-label">
                                Affiliate Sites<span className="ast">*</span>
                              </label>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <div className="gutter-box">
                                <Select
                                  className="selectBoxes field"
                                  defaultValue="Select Requesting Site"
                                  value={
                                    this.state.set_requestingId.length &&
                                    this.state.set_requestingId.length > 1
                                      ? this.state.set_requestingId
                                      : 'Select Requesting Site'
                                  }
                                  onChange={this.edmavaliablesitehandleChange}
                                  style={{ width: '100%' }}
                                >
                                  {!_.isEmpty(this.state.req_sites) ? (
                                    this.state.req_sites.map((resp_data) => {
                                      return (
                                        <Select.Option
                                          key={resp_data.reqSiteCode}
                                          value={resp_data.reqSiteCode}
                                        >
                                          {resp_data.reqSiteDescription}
                                        </Select.Option>
                                      );
                                    })
                                  ) : (
                                    <Select.Option value="No data">
                                      No data
                                    </Select.Option>
                                  )}
                                </Select>
                              </div>
                            </Col>
                            <Col sm={9} className="gutter-row">
                              <label
                                className="customLabel"
                                style={{
                                  marginTop: '10px',
                                  color: 'red',
                                }}
                              >
                                {this.state.edmerrormsg &&
                                  `${this.state.edmerrormsg}`}
                              </label>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                    </>
                  </ClosableModal>
                </>
              </>
            ) : (
              <Alert
                closable
                onClose={this.closeAlert}
                message="No data returned from query. Please try again"
                type={this.state.type}
                showIcon
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
