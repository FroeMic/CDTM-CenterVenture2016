#!/usr/bin/env python
import argparse
import os

from mongodb_helpers import mongohelp
import download_Munich_ODS as muc_ods_download
import mdb_Munich_ODS as muc_ods_import
import mdb_generic_ODS as muc_generic_import

# Command-Line Arguments
parser = argparse.ArgumentParser(description='ODS Autosetup')
parser.add_argument('--data', '-d', type=str, help='data folder', required=True)
parser.add_argument('--port', '-p', type=str, help='data folder', required=True)

args = parser.parse_args()

# reset database
mongohelp.reset_db(args.port)

# download munich
muc_ods_download.download_muc_ods(os.path.join(args.path, "munich-opendata"))
# post munich
muc_ods_import.import_muc_ods(os.path.join(args.path, "munich-opendata"), args.port)

# post lmu-wohnmiete
muc_generic_import.import_ods(os.path.join(args.path, "lmu-munich-mietspiegel2003"), args.port)

# post preproc foursquare
muc_generic_import.import_ods(os.path.join(args.path, "foursquare"), args.port)

# post parkhere foursquare
muc_generic_import.import_ods(os.path.join(args.path, "park_here_aidenbachstr"), args.port)