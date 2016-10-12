#!/usr/bin/env python
import argparse
import os

import download_Munich_ODS as muc_ods_download
import mdb_Munich_ODS as muc_ods_import
import mdb_generic_ODS as muc_generic_import

# Command-Line Arguments
parser = argparse.ArgumentParser(description='ODS Autosetup')
parser.add_argument('--path', '-p', type=str, help='data folder', required=True)

args = parser.parse_args()

# download munich
muc_ods_download.download_muc_ods(os.path.join(args.path, "munich-opendata"))
# post munich
muc_ods_import.import_muc_ods(os.path.join(args.path, "munich-opendata"))

# post lmu-wohnmiete
muc_generic_import.import_ods(os.path.join(args.path, "lmu-munich-mietspiegel2003"))

# post preproc foursquare
muc_generic_import.import_ods(os.path.join(args.path, "foursquare"))